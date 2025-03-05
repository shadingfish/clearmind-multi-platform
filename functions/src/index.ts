// functions/src/index.ts

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// 确保已在其他地方或此处初始化：
admin.initializeApp();

const db = admin.firestore();

/**
 * Callable Cloud Function:
 * 删除指定用户 Firestore 数据 + Auth 用户
 */
export const deleteUserData = functions.https.onCall( async (data, context) => {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated"
    );
  }

  try {
    // ——————————————————————————————————————————————————————
    // 1) 先把要删除的 docRef 们收集到一个数组里
    //    你需要删除的根级文档有 /users/{uid}, /ChapterProgress/{uid}
    // ——————————————————————————————————————————————————————
    const deleteRefs: admin.firestore.DocumentReference[] = [];
    // const deleteRefs: FirebaseFirestore.DocumentReference[] = [];
    deleteRefs.push(db.collection("users").doc(uid));
    deleteRefs.push(db.collection("ChapterProgress").doc(uid));

    // ——————————————————————————————————————————————————————
    // 2) 遍历各章节 ["Presurvey","Chapter1","Chapter2",...]
    //    列出所有 activityDocId，然后拼出 /{chapter}/{activityId}/users/{uid}
    // ——————————————————————————————————————————————————————
    const chapters = [
      "Presurvey",
      "Chapter1",
      "Chapter2",
      "Chapter3",
      "Chapter4",
      "Postsurvey",
    ];

    for (const chapter of chapters) {
      // 列举所有 {activityId} 文档
      const activityDocRefs = await db.collection(chapter).listDocuments();
      // 逐个 activityDocId，组合出子文档 /users/{uid}
      for (const activityDocRef of activityDocRefs) {
        const userSubDocRef = activityDocRef.collection("users").doc(uid);
        deleteRefs.push(userSubDocRef);
      }
    }

    // ——————————————————————————————————————————————————————
    // 3) 因为 batch 有 500 次写的限制，我们做个简单切分
    //    如果你的文档数少于 500，直接用一个 batch 即可
    // ——————————————————————————————————————————————————————
    const BATCH_SIZE = 500;
    let batch = db.batch();
    let batchCounter = 0;

    for (const docRef of deleteRefs) {
      batch.delete(docRef);
      batchCounter++;

      if (batchCounter === BATCH_SIZE) {
        // 提交前一个batch
        await batch.commit();
        // 重置
        batch = db.batch();
        batchCounter = 0;
      }
    }

    // 提交最后一批(如果有剩余)
    if (batchCounter > 0) {
      await batch.commit();
    }

    // ——————————————————————————————————————————————————————
    // 4) 最后删除 Auth 用户账号
    // ——————————————————————————————————————————————————————
    await admin.auth().deleteUser(uid);

    console.log(`Successfully deleted user data and auth for uid=${uid}`);

    // 返回给客户端
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting user data:", err);
    throw new functions.https.HttpsError("internal", err.message, err);
  }
});
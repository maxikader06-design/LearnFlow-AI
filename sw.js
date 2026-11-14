// KEDIR LEARNFLOW — Push Notification Service Worker

self.addEventListener("push", event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }

  const title = data.title || "KEDIR LEARNFLOW";

  const options = {
    body: data.body || "حان وقت مراجعة درسك!",
    data: {
      url: data.url ||
        "https://maxikader06-design.github.io/LearnFlow-AI/",
      reviewId: data.reviewId || null
    },
    tag: data.reviewId
      ? `learnflow-review-${data.reviewId}`
      : "learnflow-review"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const target =
    event.notification.data?.url ||
    "https://maxikader06-design.github.io/LearnFlow-AI/";

  event.waitUntil(
    clients.openWindow(target)
  );
});

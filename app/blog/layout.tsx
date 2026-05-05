import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "আব্দুল গাফফারের সংগ্রামী ও প্রেরণাদায়ক গল্প",
  description:
    "একজন সাহসী আব্দুল গাফফারের সংগ্রামী ও প্রেরণাদায়ক গল্প — Pristine Security Service Limited এর একজন নিবেদিতপ্রাণ সিকিউরিটি গার্ডের জীবন বদলানোর অনুপ্রেরণামূলক কাহিনী।",
  openGraph: {
    title: "আব্দুল গাফফারের সংগ্রামী ও প্রেরণাদায়ক গল্প",
    description:
      "Pristine Security Service Limited এর একজন সাহসী কর্মীর জীবন বদলানোর অনুপ্রেরণামূলক কাহিনী।",
    images: ["/assets/story1.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

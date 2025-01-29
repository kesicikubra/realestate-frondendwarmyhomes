import { Akshar } from "next/font/google";
import BootstrapProvider from "@/helpers/providers/bootstrap-provider";
import { config } from "@/helpers/config";
import Messenger from "@/components/common/misc/messenger";
import { Suspense } from 'react';
import DictionaryProvider from "@/helpers/providers/lang-switcher-provider";
import { getDictionary } from "@/dictionaries/dictionaries";

const akshar = Akshar({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-akshar",
});

export const metadata = {
    title: {
        template: `%s | ${config.project.name}`,
        default: config.project.name, // a default is required when creating a template
    },
    description: config.project.description,
};

export default function RootLayout({ children, params }) {
    const t = getDictionary(params.lang);
    return (
      <html className={akshar.variable} lang={params.lang}>
        <body>
          <Suspense fallback={<div>Loading...</div>}>
            <BootstrapProvider>
              <DictionaryProvider t={t}>
                <main>{children}</main>
              </DictionaryProvider>
            </BootstrapProvider>
            <Messenger />
          </Suspense>
        </body>
      </html>
    );
  }
import HomePage, { homeMetadata } from "@/components/pages/HomePage";

/* /home (español): home completa aparcada mientras dura el coming soon. La página vive
   en components/pages/HomePage.tsx; la versión inglesa es app/(en)/en/home/page.tsx. */
export const metadata = homeMetadata("es");

export default function Home() {
  return <HomePage lang="es" />;
}

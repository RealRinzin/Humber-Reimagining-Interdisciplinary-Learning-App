import ClientPage from "./ClientPage";
import ServerPage from "./ServerPage";

export default async function page() {
  return (
    <ClientPage>
      <ServerPage />
    </ClientPage>
  );
}

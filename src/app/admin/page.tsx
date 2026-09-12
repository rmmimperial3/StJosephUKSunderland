import { LoginForm } from "@/app/admin/login-form";
import { AdminEditor } from "@/app/admin/editor";
import { getAdminPassword, isAdminSession } from "@/lib/admin-auth";
import { getLiveContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = Boolean(getAdminPassword());
  const loggedIn = await isAdminSession();

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <LoginForm configured={configured} />
      </div>
    );
  }

  const live = await getLiveContent();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <AdminEditor
        initial={{
          phone: live.phone,
          email: live.email,
          welcomeBlurb: live.welcomeBlurb,
          massTimes: live.massTimes,
          notices: live.notices,
        }}
      />
    </div>
  );
}

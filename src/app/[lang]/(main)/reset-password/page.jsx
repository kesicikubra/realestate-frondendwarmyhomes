import Spacer from "@/components/common/misc/spacer";
import PageHeader from "@/components/common/page-header";
import ResetPassword from "@/components/reset-password/reset-password";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <div className="container">
      <PageHeader title="Reset Password" />
      <Spacer />
      <ResetPassword />
      <Spacer height={100} />
    </div>
  );
};

export default ResetPasswordPage;

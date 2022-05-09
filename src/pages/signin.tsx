import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import LoginForm from "@components/auth/login-form";
import PageHeader from "@components/ui/page-header";

export { getStaticProps } from "@framework/ssr/common";

export default function SignInPage() {
  return (
    <>
      <PageHeader pageHeader="Sign In" />
      <Container>
        <div className="py-16 lg:py-20">
          <LoginForm />
        </div>
        <Subscription />
      </Container>
    </>
  );
}

SignInPage.getLayout = getLayout;

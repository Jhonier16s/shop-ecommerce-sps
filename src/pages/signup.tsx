import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
import SignUpForm from "@components/auth/sign-up-form";
import PageHeader from "@components/ui/page-header";
import Subscription from "@components/common/subscription";

export { getStaticProps } from "@framework/ssr/common";

export default function SignUpPage() {
  return (
    <>
      <PageHeader pageHeader="Register" />
      <Container>
        <div className="py-16 lg:py-20">
          <SignUpForm />
        </div>
        <Subscription />
      </Container>
    </>
  );
}

SignUpPage.getLayout = getLayout;

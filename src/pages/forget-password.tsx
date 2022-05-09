import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
import PageHeader from "@components/ui/page-header";
import Subscription from "@components/common/subscription";
import ForgetPasswordForm from "@components/auth/forget-password/forget-password";

export { getStaticProps } from '@framework/ssr/common';

export default function ForgetPasswordPage() {
	return (
		<>
			<PageHeader pageHeader="Forget Password" />
			<Container>
				<div className="py-16 lg:py-20">
					<ForgetPasswordForm layout="page" />
				</div>
				 <Subscription /> 
			</Container>
		</>
	);
}

ForgetPasswordPage.getLayout = getLayout;

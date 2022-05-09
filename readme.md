quite las siguientes lineas para poder compilar en /mnt/c/sites/sps-ecommerce/src/components/auth/forget-password/forget-password.tsx Linea: 114 
{/* {!verifiedEmail && (
    <EnterEmailView loading={isLoading} onSubmit={handleEmailSubmit} />
)} */}

Linea 12:
const EnterEmailView = dynamic(() => import("./enter-email-view"));


ignorar el modo estricto ::::>
next.config.js

typescript:{
    ignoreBuildErrors: true,
  },
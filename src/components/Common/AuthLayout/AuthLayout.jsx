import { Link } from "react-router-dom";
import { Logo } from "../../Common/Icons/Icons";

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  footerText, 
  footerLink, 
  footerLinkText 
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo className="h-16 w-auto text-primary-blue" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-card-title">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-card-text">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-card-text">
        <p>
          {footerText}{' '}
          <Link 
            to={footerLink} 
            className="font-medium text-primary-blue hover:text-primary-blue-dark"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
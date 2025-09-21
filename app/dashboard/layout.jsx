import AdminHeader from "../../_components/adminHeader/adminHeader";
import ReduxTripsProvider from '../Provides/reduxTripsProvider'
export default function dashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxTripsProvider>
          <AdminHeader />
          {children}
        </ReduxTripsProvider>
      </body>
    </html>
  );
}

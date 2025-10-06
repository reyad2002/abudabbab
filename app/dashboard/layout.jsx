import { headers } from "next/headers";
import AdminHeader from "../../_components/adminHeader/adminHeader";
import ReduxTripsProvider from '../Provides/reduxTripsProvider'
export default function dashboardLayout({ children }) {
  return (
    <ReduxTripsProvider>
      <AdminHeader />
      <div className="bg-black">
        {children}
      </div>
    </ReduxTripsProvider>
  );
}

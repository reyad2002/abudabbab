import AdminHeader from "../../_components/adminHeader/adminHeader";
import ReduxTripsProvider from '../Provides/reduxTripsProvider'
export default function dashboardLayout({ children }) {
  return (
    <ReduxTripsProvider>
      <AdminHeader />
      {children}
    </ReduxTripsProvider>
  );
}

import EditMenuForm from "./EditItemClient";

export const metadata = {
  title: "Edit Item - Kupliq Cafe",
  description: "Edit Item",
};

export default function myreservation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditMenuForm />
    </Suspense>
  );
}

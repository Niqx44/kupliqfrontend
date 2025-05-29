import EditMenuForm from "./EditItemClient";
import { Suspense } from 'react';

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

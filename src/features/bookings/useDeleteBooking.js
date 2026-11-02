import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingMutation, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: (data) => {
      toast.success(`Booking successfully deleted.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while delteing a booking"),
  });

  return { deleteBookingMutation, isDeleting };
}

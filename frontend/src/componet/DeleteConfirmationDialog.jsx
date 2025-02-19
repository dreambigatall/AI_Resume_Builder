
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../components/ui/alert-dialog"
  
import { Trash2 } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';

function DeleteConfirmationDialog({ onDeleteAccount }) { // Assume you pass a delete function as a prop
  const handleDeleteConfirmation = () => {
    toast.promise(
      onDeleteAccount(), // Call your account deletion function here (API call, etc.)
      {
        loading: 'Deleting account...',
        success: 'Account deleted successfully!',
        error: 'Failed to delete account.',
      },
      {
        success: {
          icon: '🔥', // Example success icon (fire - account gone!)
        },
        error: {
          icon: '⚠️', // Example error icon (warning)
        },
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <button
             
              className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
              <Trash2 className="w-5 h-5" /> Delete
            </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your resume
            and remove your data from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirmation}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <Toaster /> {/* Ensure Toaster is rendered */}
    </AlertDialog>
  );
}

export default DeleteConfirmationDialog;
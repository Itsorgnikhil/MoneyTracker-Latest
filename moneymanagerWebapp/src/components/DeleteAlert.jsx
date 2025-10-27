    import { LoaderCircle } from "lucide-react";
    import { useState } from "react";

    const DeleteAlert = ({ content, onDelete, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
        await onDelete();
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6 space-x-4">
           

            {/* Delete Button */}
            <button
            onClick={handleDelete}
            disabled={loading}
            type="button"
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
            {loading ? (
                <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Deleting...
                </>
            ) : (
                "Delete"
            )}
            </button>
        </div>
        </div>
    );
    };

    export default DeleteAlert;

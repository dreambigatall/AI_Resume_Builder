
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useReactToPrint } from 'react-to-print';
import { Edit, Trash2, Save, Download, Loader2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import DeleteConfirmationDialog from '../componet/DeleteConfirmationDialog'; // Adjust path if necessary

const ResumeCollection = () => {
    const { getToken, isLoaded } = useAuth();
    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [editedResume, setEditedResume] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        contentRef: printRef, // Keep this for reliability
        documentTitle: selectedResume ? `${selectedResume.fullName}-Resume` : 'Resume',
    });

    const fetchResumes = async () => {
        setIsLoading(true);
        setError('');
        try {
            const token = await getToken();
            const res = await fetch(import.meta.env.VITE_API_URL + '/resumes/user/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Failed to fetch resumes (Status: ${res.status})`);
            const data = await res.json();
            setResumes(data);
        } catch (err) {
            setError(err.message);
            toast.error(`Error fetching resumes: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoaded) {
            fetchResumes();
        }
        return () => {
            setIsLoading(false);
            setIsSaving(false);
            setIsDeleting(false);
        };
    }, [isLoaded, getToken]);

    const handleSelectResume = (resume) => {
        setSelectedResume(resume);
        setEditedResume(JSON.parse(JSON.stringify(resume)));
        setEditMode(false);
        setError('');
    };

    const handleChange = (e) => {
        setEditedResume({ ...editedResume, [e.target.name]: e.target.value });
    };

    const handleSectionChangeForEdit = (index, field, value) => {
        setEditedResume((prev) => {
            const updatedSections = prev.sections.map((sec, i) =>
                i === index ? { ...sec, [field]: value } : sec
            );
            return { ...prev, sections: updatedSections };
        });
    };

    const handleSaveEdit = async () => {
        setIsSaving(true);
        setError('');
        try {
            const token = await getToken();
            const res = await fetch(import.meta.env.VITE_API_URL + `/resumes/${editedResume._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(editedResume),
            });
            if (!res.ok) throw new Error(`Failed to update resume (Status: ${res.status})`);
            const updated = await res.json();
            setResumes(resumes.map((r) => (r._id === updated._id ? updated : r)));
            setSelectedResume(updated);
            setEditMode(false);
            toast.success('Resume updated successfully');
        } catch (err) {
            setError(err.message);
            toast.error(`Error saving resume: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteConfirmed = async () => {
        if (!selectedResume) return;
        setIsDeleting(true);
        setError('');
        try {
            const token = await getToken();
            const res = await fetch(import.meta.env.VITE_API_URL + `/resumes/${selectedResume._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Failed to delete resume (Status: ${res.status})`);
            toast.success('Resume deleted successfully');
            setResumes(resumes.filter((r) => r._id !== selectedResume._id));
            setSelectedResume(null);
            setEditMode(false);
        } catch (err) {
            setError(err.message);
            toast.error(`Error deleting resume: ${err.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

     const handlePrintClick = () => {
        console.log("Print button clicked. printRef.current:", printRef.current);
        if (!printRef.current) {
            console.error("Print ref is not assigned! Cannot print.");
            toast.error("Could not find content to print.");
            return;
        }
        handlePrint();
    }

    const ErrorDisplay = ({ message, onDismiss }) => {
        if (!message) return null;
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex justify-between items-center print:hidden" role="alert">
                <span className="block sm:inline">{message}</span>
                <button onClick={onDismiss} className="ml-4" aria-label="Dismiss error">
                    <XCircle className="h-5 w-5 text-red-600 hover:text-red-800" />
                </button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-lg text-gray-700">Loading Resumes...</span>
            </div>
        );
    }

    if (!selectedResume) {
        return (
            <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Your Resumes</h1>
                <ErrorDisplay message={error} onDismiss={() => setError('')} />
                {resumes.length === 0 ? (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <p className="text-lg text-gray-600">No resumes found.</p>
                        <p className="text-sm text-gray-500 mt-2">Create your first resume to see it here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {resumes.map((resume) => (
                            <div
                                key={resume._id}
                                className="p-5 border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white"
                                onClick={() => handleSelectResume(resume)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && handleSelectResume(resume)}
                                aria-label={`View resume for ${resume.fullName}`}
                            >
                                <h2 className="text-lg font-semibold text-blue-700 truncate">{resume.fullName}</h2>
                                <p className="text-sm text-gray-600 truncate">{resume.email}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Last updated: {new Date(resume.updatedAt || resume.createdAt || Date.now()).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
            <button
                onClick={() => { setSelectedResume(null); setEditMode(false); setError(''); }}
                className="text-blue-600 hover:text-blue-800 mb-5 inline-flex items-center print:hidden"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to List
            </button>

            <ErrorDisplay message={error} onDismiss={() => setError('')} />

            {/* --- Printable Area --- */}
            <div ref={printRef} className="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-6 print:shadow-none print:border print:p-2">
                {/* Header Section */}
                <div className="text-center mb-6 border-b pb-4 print:border-b-0 print:mb-4">
                    {editMode ? (
                        <div>
                            <label htmlFor="fullName" className="sr-only">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                value={editedResume.fullName}
                                onChange={handleChange}
                                className="text-2xl md:text-3xl font-bold text-center border border-gray-300 p-2 rounded w-full max-w-md mx-auto focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Full Name"
                            />
                         </div>
                    ) : (
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 print:text-2xl">{selectedResume.fullName}</h1>
                    )}
                    <p className="text-sm text-gray-600 mt-2 print:text-xs">
                        {editMode ? (
                            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" type="email" name="email" value={editedResume.email} onChange={handleChange} className="text-sm border border-gray-300 p-1 rounded focus:ring-1 focus:ring-blue-500" placeholder="Email"/>
                                <span className="hidden sm:inline">•</span>
                                <label htmlFor="phone" className="sr-only">Phone</label>
                                <input id="phone" type="tel" name="phone" value={editedResume.phone} onChange={handleChange} className="text-sm border border-gray-300 p-1 rounded focus:ring-1 focus:ring-blue-500" placeholder="Phone"/>
                            </div>
                        ) : (
                            <>
                                <a href={`mailto:${selectedResume.email}`} className="hover:underline">{selectedResume.email}</a>
                                <span className="mx-2">•</span>
                                <span>{selectedResume.phone}</span>
                            </>
                        )}
                    </p>
                </div>

                {/* Summary Section */}
                <div className="mb-6 print:mb-4">
                    {/* --- TITLE COLORING --- */}
                    <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2 mb-3 print:text-lg print:mb-1 print:pb-1">
                        Professional Summary
                    </h2>
                    {editMode ? (
                        <div>
                            <label htmlFor="summary" className="sr-only">Professional Summary</label>
                            <textarea
                                id="summary"
                                name="summary"
                                value={editedResume.summary}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Write a brief summary..."
                            />
                        </div>
                    ) : (
                        <p className="text-gray-700 whitespace-pre-line print:text-sm">{selectedResume.summary || <span className="text-gray-400 italic">No summary provided.</span>}</p>
                    )}
                </div>

                {/* Dynamic Sections */}
                <div>
                    {(editMode ? editedResume.sections : selectedResume.sections)?.map((sec, index) => (
                        <div key={sec._id || `section-${index}`} className="mb-6 print:mb-3">
                            {editMode ? (
                                <div className="border border-dashed border-gray-300 p-4 rounded">
                                    <div className="mb-2">
                                        <label htmlFor={`sectionTitle-${index}`} className="sr-only">Section Title</label>
                                        {/* --- TITLE COLORING (EDIT MODE) --- */}
                                        <input
                                            id={`sectionTitle-${index}`}
                                            type="text"
                                            name={`sectionTitle-${index}`}
                                            value={sec.title}
                                            onChange={(e) => handleSectionChangeForEdit(index, 'title', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded font-semibold text-lg text-indigo-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Section Title (e.g., Experience, Education)"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`sectionContent-${index}`} className="sr-only">Section Content</label>
                                        <textarea
                                            id={`sectionContent-${index}`}
                                            name={`sectionContent-${index}`}
                                            value={sec.content}
                                            onChange={(e) => handleSectionChangeForEdit(index, 'content', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Section Content (e.g., Job details, Degree information)"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* --- TITLE COLORING (DISPLAY MODE) --- */}
                                    <h3 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-2 print:text-base print:mb-1 print:pb-1">
                                        {sec.title || <span className="text-gray-400 italic">Untitled Section</span>}
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-line print:text-sm">{sec.content || <span className="text-gray-400 italic">No content provided.</span>}</p>
                                </>
                            )}
                        </div>
                    ))}
                     {(selectedResume.sections?.length === 0 && !editMode) && (
                        <p className="text-gray-500 italic text-center py-4 print:hidden">This resume doesn't have any additional sections.</p>
                    )}
                </div>
            </div> {/* --- End Printable Area --- */}


            {/* --- Action Buttons Area --- */}
            <div className="flex flex-wrap gap-3 justify-end print:hidden">
                {!editMode ? (
                    <>
                        <button
                            onClick={() => setEditMode(true)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                        >
                            <Edit className="w-4 h-4" /> Edit
                        </button>
                        <DeleteConfirmationDialog
                            onDeleteAccount={handleDeleteConfirmed}
                            isLoading={isDeleting}
                            triggerButton={
                                <button
                                    className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 disabled:opacity-50"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                             }
                        />
                        <button
                            onClick={handlePrintClick}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleSaveEdit}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 disabled:opacity-50"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={() => { setEditMode(false); setEditedResume(JSON.parse(JSON.stringify(selectedResume))); setError(''); }}
                            disabled={isSaving}
                            className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResumeCollection;
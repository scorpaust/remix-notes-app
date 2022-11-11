import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css";
import newNoteStyles from "~/components/NewNote.css";

export default function NoteDetails() {

    const note = useLoaderData();

    return (
        <main id='note-details'>
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note?.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    );
}

export async function loader({params}) {
    const notes = await getStoredNotes();
    const noteId = params.noteId;
    const selectedNote = notes.find(note => note.id === noteId);

    if (!selectedNote) {
        throw json({message: 'Could not find note for id ' + noteId}, {
            status: 404,
            statusText: 'Note not found.'
        });
    }

    return selectedNote;
}

export function CatchBoundary() {

    const caughtResponse = useCatch();

    const message = caughtResponse.data?.message || 'Data not found.';

    return (
        <main>
            <p className="info-message">{message}</p>
        </main>
    );
}

export function links() {
    return [
      {
        rel: 'stylesheet',
        href: styles
      }
    ]
  }

export function meta({data}) {
    return {
        title: `[Notes App] ${data.title}`,
        description: `${data.content}`
    }
}
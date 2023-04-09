import { Request, Response } from 'express';
import { INote } from '../interfaces/note.interface';
import { NoteService } from '../services/note.services';
import { INoteController } from './../interfaces/note.interface';

export class NoteController implements INoteController {
    constructor(private noteService: NoteService) {
    }

    async getAllNotes(_req: Request, res: Response): Promise<void> {
        const notes: INote[] = await this.noteService.getAllNotes();
        res.status(200).json(notes);
    }

    async getNoteById(req: Request, res: Response): Promise<void> {
        const note: INote | null = await this.noteService.getNoteById(req.params.id);
        if (!note) {
            res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            return;
        }

        res.status(200).json(note);
    }

    async createNote(req: Request, res: Response): Promise<void> {
        const note: INote = await this.noteService.createNote(req.body);
        res.status(201).json(note);
    }

    async updateNoteById(req: Request, res: Response): Promise<void> {
        const updatedNote: INote | null = await this.noteService.updateNoteById(req.params.id, req.body);
        if (!updatedNote) {
            res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            return;
        }

        res.status(200).json(updatedNote);
    }

    async deleteNoteById(req: Request, res: Response): Promise<void> {
        const deletedNote: boolean | null = await this.noteService.deleteNoteById(req.params.id);
        if (!deletedNote) {
            res.status(404).json({ message: `Note with id ${req.params.id} not found` });
            return
        }

        res.status(201).json(deletedNote);
    }
}

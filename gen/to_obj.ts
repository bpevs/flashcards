import type { ExportObj } from '../models/types.ts'
import Deck from '../models/deck.ts'

export default function toObj(deck: Deck): ExportObj {
  const data: ExportObj = {
    id: deck.id,
    name: deck.name,
    desc: deck.desc,
    meta: deck.meta,
    columns: Object.keys(deck.notes[0].data),
    notes: [],
  }

  if (!deck.meta) delete deck.meta

  data.notes = deck.notes.map((note) => {
    if (Object.keys(note.data).length !== data.columns.length) {
      throw new Error(`Mismatched column length, row: ${note.id}`)
    }
    return data.columns.map((key) => note.data[key])
  })

  return data
}

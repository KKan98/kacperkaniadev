export type PostModel = {
  slug: string,
  title: string,
  summary: string,
  footer: {
    creationDate: Date,
    readingTime: number,
    words: number
  },
  fileName: string
}

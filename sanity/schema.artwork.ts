import { defineField, defineType } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Kunst', value: 'kunst' },
          { title: 'Uld', value: 'uld' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      description: 'Group this work under a section on its gallery page.',
      type: 'string',
      options: {
        list: [
          { title: 'Spiritual art', value: 'spiritual-art' },
          { title: 'Christmas', value: 'christmas' },
          { title: 'Nature', value: 'nature' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
      group: 'group',
    },
    prepare({ title, media, category, group }) {
      return {
        title,
        subtitle: [category === 'uld' ? 'Uld' : 'Kunst', group]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
});

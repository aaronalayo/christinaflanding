import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Portrait alt text',
      type: 'string',
      description: 'Describe the portrait for visitors using assistive technology.',
    }),
    defineField({
      name: 'paragraphs',
      title: 'About text',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'text'},
            prepare({title}) {
              return {title: title || 'Empty paragraph'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'Booking call-to-action text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Booking button label',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Booking button destination',
      type: 'string',
      options: {
        list: [
          {title: 'Booking', value: '/booking'},
          {title: 'Contact', value: '/kontakt'},
          {title: 'Treatments', value: '/behandlinger'},
          {title: 'About', value: '/om-mig'},
          {title: 'Art', value: '/kunst'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {title: 'title', media: 'portrait'},
  },
})

import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    title,
    seo{
      metaTitle,
      metaDescription,
      metaImage
    }
  }
`);

export const headerQuery = defineQuery(`
  *[_type == "header"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    navigationItems[]{
      _type,
      _key,
      label,
      link{
        linkType,
        href,
        page->{
          name,
          slug
        },
        caseStudy->{
          name,
          slug
        },
        openInNewTab
      }
    }
  }
`);

const caseStudyFieldsQuery = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  name,
  slug,
  "date": coalesce(date, _updatedAt),
  seo{
    metaTitle,
    metaDescription,
    metaImage
  }
`;

const linkReferenceQuery = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "caseStudy": caseStudy->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReferenceQuery}
      }
`;

export const getHomePageQuery = defineQuery(`
  *[_type == 'page' && slug.current == '/'][0]{
    _id,
    _type,
    name,
    slug,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReferenceQuery}
          }
        }
      },
    },
    seo{
      metaTitle,
      metaDescription,
      metaImage
    },
  }
`);
export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReferenceQuery}
          }
        }
      },
    },
    seo{
      metaTitle,
      metaDescription,
      metaImage
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "caseStudy" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${caseStudyFieldsQuery}
  }
`);

export const moreCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${caseStudyFieldsQuery}
  }
`);

export const caseStudyQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReferenceQuery}
    }
  },
    ${caseStudyFieldsQuery}
  }
`);

export const caseStudyPagesSlugs = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

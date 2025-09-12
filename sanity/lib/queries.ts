import { defineQuery } from 'next-sanity';

const linkReferenceQuery = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "caseStudy": caseStudy->slug.current
  }
`;

// Base blocks query (without contributions)
const caseStudyBlocksQuery = /* groq */ `
  _type,
  _key,
  _type == "callToAction" => {
    heading,
    text,
    buttonText,
    link {
      _type,
      _key,
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
  },
  _type == "nameHero" => {
    logo,
    description[]{
      _type,
      _key,
      children[]{
        _type,
        _key,
        marks,
        text
      },
      style,
      listItem,
      level,
      markDefs[]{
        _type,
        _key,
        _type == "link" => {
          "page": page->slug.current,
          "caseStudy": caseStudy->slug.current
        }
      }
    }
  },
  _type == "navBar" => {
    logo
  },
  _type == "caseDetails" => {
    title,
    descriptionLabel,
    description[]{
      _type,
      _key,
      children[]{
        _type,
        _key,
        marks,
        text
      },
      style,
      listItem,
      level,
      markDefs[]{
        _type,
        _key,
        _type == "link" => {
          "page": page->slug.current,
          "caseStudy": caseStudy->slug.current
        }
      }
    },
    detailsLabel,
    detailsItems[]{
      _type,
      _key,
      itemType,
      title,
      text,
      tags[]->{
        _id,
        _ref,
        name,
      },
      linkData{
        linkLabel,
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
    },
    creditsLabel,
    creditsItems[]{
      _type,
      _key,
      itemType,
      title,
      text,
      tags[]->{
        _id,
        _ref,
        name,
      },
      linkData{
        linkLabel,
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
  },
  _type == "mediaGroup" => {
    mediaItems[]{
      _type,
      _key,
      media{
        asset->{
          ...,
          metadata
        },
        hotspot,
        crop,
        alt
      }
    }
  },
  _type == "mediaColumn" => {
    mediaItem{
      _type,
      _key,
      media{
        asset->{
          ...,
          metadata
        },
        hotspot,
        crop,
        alt
      }
    }
  }
`;

// Full blocks query (includes contributions for regular pages)
const blocksQuery = /* groq */ `
  _type,
  _key,
  _type == "callToAction" => {
    heading,
    text,
    buttonText,
    link {
      _type,
      _key,
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
  },
  _type == "nameHero" => {
    logo,
    description[]{
      _type,
      _key,
      children[]{
        _type,
        _key,
        marks,
        text
      },
      style,
      listItem,
      level,
      markDefs[]{
        _type,
        _key,
        _type == "link" => {
          "page": page->slug.current,
          "caseStudy": caseStudy->slug.current
        }
      }
    }
  },
  _type == "navBar" => {
    logo
  },
  _type == "caseDetails" => {
    title,
    descriptionLabel,
    description[]{
      _type,
      _key,
      children[]{
        _type,
        _key,
        marks,
        text
      },
      style,
      listItem,
      level,
      markDefs[]{
        _type,
        _key,
        _type == "link" => {
          "page": page->slug.current,
          "caseStudy": caseStudy->slug.current
        }
      }
    },
    detailsLabel,
    detailsItems[]{
      _type,
      _key,
      itemType,
      title,
      text,
      tags[]->{
        _id,
        _ref,
        name,
      },
      linkData{
        linkLabel,
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
    },
    creditsLabel,
    creditsItems[]{
      _type,
      _key,
      itemType,
      title,
      text,
      tags[]->{
        _id,
        _ref,
        name,
      },
      linkData{
        linkLabel,
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
  },
  _type == "mediaGroup" => {
    mediaItems[]{
      _type,
      _key,
      media{
        asset->{
          ...,
          metadata
        },
        hotspot,
        crop,
        alt
      }
    }
  },
  _type == "mediaColumn" => {
    mediaItem{
      _type,
      _key,
      media{
        asset->{
          ...,
          metadata
        },
        hotspot,
        crop,
        alt
      }
    }
  },
  _type == "contributions" => {
    title,
    projectListLabel,
    projectsList[]->{
      _type,
      _key,
      _id,
      name,
      slug,
      poster,
      "date": coalesce(date, _updatedAt),
      "pageBuilder": pageBuilder[]{${caseStudyBlocksQuery}}
    },
    agencyWorkList[]->{
      _type,
      _key,
      _id,
      agencyClient,
      agencyClientLink
    }
  }
`;
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

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    "pageBuilder": pageBuilder[]{${blocksQuery}},
    seo{
      metaTitle,
      metaDescription,
      metaImage
    }
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
  }
`);

export const moreCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
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
  }
`);

export const caseStudyQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug] [0] {
    _id,
    _type,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    name,
    slug,
    poster,
    "date": coalesce(date, _updatedAt),
    "pageBuilder": pageBuilder[]{${caseStudyBlocksQuery}},
    seo{
      metaTitle,
      metaDescription,
      metaImage
    }
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

export const footerQuery = defineQuery(`
  *[_type == "footer"][0]{
    rights
  }
`);

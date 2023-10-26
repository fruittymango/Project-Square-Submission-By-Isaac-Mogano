import { ReactElement } from 'react'

/**
 * Schema  definition for the component used to render brand icons. 
 */
export interface BrandIconInterface{
    imageGuid: string;
};


/**
 * Schema  definition for using the ArticleSection wrapper component. 
 */
export interface ArticleSectionInterface{
    identifier: string;
    classIdentifier: string; 
    sectionTitle: string;
    children?: ReactElement;
};


/**
 * Schema for using the SupportingBrands component. 
 */
export interface SupportingBrandsProps{
    brandIcons: Array<string>;
}
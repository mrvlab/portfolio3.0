import type { FlexibleText as FlexibleTextType } from '@/sanity.types';
import React from 'react';
import RichText from '../../RichText/RichText';

type IFlexibleText = {
  block: FlexibleTextType;
  index: number;
};

const FlexibleText = ({ block }: IFlexibleText) => {
  if (!block) return null;

  const { title, paragraph, flipLayout } = block;

  // Define grid classes based on flipLayout
  const titleClasses = flipLayout
    ? 'col-span-full sm:col-start-5 sm:col-span-4 lg:col-start-9 lg:col-span-4'
    : 'col-span-full sm:col-start-1 sm:col-span-4 lg:col-start-1 lg:col-span-4';

  const paragraphClasses = flipLayout
    ? 'col-span-full sm:col-start-1 sm:col-span-4 lg:col-start-1 lg:col-span-7'
    : 'col-span-full sm:col-start-5 sm:col-span-4 lg:col-start-5 lg:col-span-7';

  return (
    <section className="grid grid-cols-4 gap-5 sm:grid-cols-8 lg:grid-cols-12">
      {title && (
        <div className={titleClasses}>
          <h2 className="text-scale-3 md:text-scale-4 font-semibold mb-6 text-light-900 dark:text-white top-5">
            {title}
          </h2>
        </div>
      )}
      {paragraph && (
        <div className={paragraphClasses}>
          <div className="text-scale-0 md:text-scale-1 text-light-600 dark:text-white/60 ">
            <RichText content={paragraph} />
          </div>
        </div>
      )}
    </section>
  );
};

export default FlexibleText;

'use client';

import React from 'react';
import DOMPurify from 'dompurify';

const SanitizedHTML = ({ html }: any) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div className='border bg-white p-3 rounded-xl border-gray-400' dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default SanitizedHTML;

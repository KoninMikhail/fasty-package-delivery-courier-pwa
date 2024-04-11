import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import React from 'react';
import styles from './styles.module.scss';

export const Markdown = React.memo(({ content }: { content: string }) => (
    <ReactMarkdown className={styles.markdown} remarkPlugins={[remarkBreaks]}>
        {content}
    </ReactMarkdown>
));

Markdown.displayName = 'Markdown';

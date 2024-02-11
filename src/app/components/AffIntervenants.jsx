'use client'

import Link from 'next/link';


const AffIntervenants = ({ liste }) => {
    return (
        <nav>
            <ul>
                {liste.map((page) => (
                    <li key={page.path}>
                        <Link href={page.path}>{page.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AffIntervenants;
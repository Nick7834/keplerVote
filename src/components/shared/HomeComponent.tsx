import { Items } from '@/features/items/items';
import React from 'react';
import { Container } from './container';

interface Props {
    className?: string;
} 

export const HomeComponent: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
        <Container className='mt-10'>
            <Items />
        </Container>
        </div>
    );
};

import { AutchForm } from '@/features/auth/components/autchForm';
import React from 'react';
import { Container } from './container';

interface Props {
    className?: string;
} 

export const AuthComponent: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Container>
                <AutchForm />
            </Container>
        </div>
    );
};

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import IlluStration1 from '../../../../../../public/images/illustration.png';
import IlluStration2 from '../../../../../../public/images/illustration-2.png';
import IlluStration3 from '../../../../../../public/images/illustration-3.png';
import IlluStration4 from '../../../../../../public/images/illustration-4.png';

export const Home = () => {
    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={IlluStration1}
                    alt='illustration 1'
                    style={{ borderRadius: '50px' }}
                    width={500}
                    height={500}
                    placeholder='blur'
                    quality={100}
                />
                <Box sx={{ mx: 6 }}>
                    <Typography textAlign='center'>
                        Bienvenue dans notre application de création d'histoires interactives ! Libérez votre créativité
                        et donnez vie à des mondes fascinants où vos choix sont la clé de l'intrigue.
                    </Typography>
                    <Typography
                        textAlign='center'
                        sx={{ mt: 6 }}
                    >
                        Notre application vous offre une plateforme conviviale et intuitive pour créer des histoires à
                        choix multiples uniques. Vous êtes le maître de votre récit, vous décidez des personnages, des
                        décors et des événements qui composeront votre histoire. Que vous soyez un écrivain chevronné ou
                        un amateur passionné, notre application vous permet d'explorer votre talent narratif.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    textAlign='center'
                    sx={{ mx: 6 }}
                >
                    Imaginez-vous en train de construire un univers fantastique rempli de créatures énigmatiques, ou
                    bien revivez une époque historique riche en rebondissements. Avec notre application, vous pouvez
                    façonner chaque détail de votre histoire, offrant ainsi une expérience unique à vos lecteurs. Chaque
                    choix que vous proposez ouvre de nouvelles possibilités, créant ainsi des embranchements narratifs
                    captivants et permettant aux lecteurs de vivre des aventures personnalisées.
                </Typography>
                <Image
                    src={IlluStration4}
                    alt='illustration 2'
                    style={{ borderRadius: '50px' }}
                    width={500}
                    height={500}
                    placeholder='blur'
                    quality={100}
                />
            </Box>
            <Box sx={{ mt: 12, display: 'flex', alignItems: 'center' }}>
                <Image
                    src={IlluStration2}
                    alt='illustration 3'
                    style={{ borderRadius: '50px' }}
                    width={500}
                    height={700}
                    placeholder='blur'
                    quality={100}
                />
                <Box sx={{ mx : 4 }}>
                    <Typography textAlign='center'>
                        Que vous cherchiez à éveiller votre imagination, à développer vos compétences en écriture ou
                        simplement à vous divertir, notre application est l'outil idéal pour donner vie à vos idées.
                        Plongez-vous dans une expérience immersive où chaque mot compte et où chaque choix a des
                        répercussions sur le déroulement de l'histoire.
                    </Typography>

                    <Typography textAlign={'center'} sx={{mt: 6}}>
                        Laissez votre créativité s'exprimer et embarquez vos lecteurs dans des aventures inoubliables.
                        C'est le moment de créer et d'explorer des mondes extraordinaires où les seules limites sont
                        celles de votre imagination.
                    </Typography>
                </Box>
                <Image
                    src={IlluStration3}
                    alt='illustration 3'
                    style={{ borderRadius: '50px' }}
                    width={500}
                    height={700}
                    placeholder='blur'
                    quality={100}
                />
            </Box>
        </Container>
    );
};

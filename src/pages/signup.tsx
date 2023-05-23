import { requireUnauthUser } from '@/apps/api/utils';
import {  SignUp } from '@/apps/front/components';
import { wrapper } from '@/store';

export default function FirstChapterGeneratorPage() {
    return <SignUp />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireUnauthUser(store, context, () => ({ props: {} }));
});
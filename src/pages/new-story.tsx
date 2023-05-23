import { requireAuthUser } from '@/apps/api/utils';
import { FirstChapterGenerator } from '@/apps/front/components';
import { wrapper } from '@/store';

export default function FirstChapterGeneratorPage() {
    return <FirstChapterGenerator />;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    return requireAuthUser(store, context, () => ({ props: {} }));
});
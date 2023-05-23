import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CustomThemeProvider } from '@/apps/front/providers';
import { Layout } from '@/apps/front/components';
import { wrapper } from '@/store';

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <CustomThemeProvider>
                <Layout>
                    <Component {...props.pageProps} />
                </Layout>
            </CustomThemeProvider>
        </Provider>
    );
}

export default MyApp;

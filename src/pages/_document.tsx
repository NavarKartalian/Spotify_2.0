import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                    <meta name="author" content="Navar Kartalian" />
                    <meta name="description" content="Spotify clone" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}
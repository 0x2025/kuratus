import path  from 'path'
import CopyPlugin from 'copy-webpack-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(import.meta.dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.js"),
                        to: path.join(import.meta.dirname, "public/static/js"),
                    },
                ],
            }),
        )
        config.resolve.alias.canvas = false;
        return config;
    },
};

export default nextConfig;

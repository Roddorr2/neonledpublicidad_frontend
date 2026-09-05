import Body1 from "../templates/Body1";
import Footer from "../templates/Footer";
import Header from "../templates/Header";


export default function BlogContentClient({ data }) {
    return (
        <div>
            <Header id_blog_head={data.id_blog_head} />

            <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
                <Body1 id_blog_body={data.id_blog_body} fecha={data.fecha} />

                <Footer id_blog_footer={data.id_blog_footer} />
            </div>
        </div>
    )
}
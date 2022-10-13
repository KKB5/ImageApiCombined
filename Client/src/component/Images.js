import React, { useContext, useState, useEffect } from 'react'
import { ImageContext } from '../App'
import Mansonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactLoading from "react-loading";
import { UseAxios } from '../hooks/UseAxios';
import { Row, Container } from 'react-bootstrap';
import {useQuery} from 'react-query';
// import useAbortController from 'react-use-cancel-token';





const Images = () => {

    // const { newAbortSignal, cancelPreviousRequest, isCancel } =  useAbortController();

    const { search, setpage } = useContext(ImageContext);

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchdata = async (url, search) => {

        // cancelPreviousRequest();
        try {
            setLoading(true)
            var cancel
            { console.log(search.search) }
            // await UseAxios.get(url, { params: search }, { signal: newAbortSignal() }).then(res => {
                await UseAxios.get(url, { params: search }).then(res => {
                { console.log(res) }
                setResponse(res.data);
            });
        } catch (error) {
            { console.log(error) }
            setError(error)
        } finally {
            setLoading(false)
        }
      
    }


    useEffect(() => {
        fetchdata('/Images', { setpage, search })
    }, [setpage, search])

    if (loading) return (<>
        <Container>
            <Row className="justify-content-center">
                <ReactLoading
                    type="spinningBubbles"
                    color="blue"
                    height={100}
                    width={50}
                    // effect ={blur}
                />
            </Row>
        </Container>

    </>)

    return (
        <>
            <div className='p-3'>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 4, 750: 6, 900: 8 }}>

                    <Mansonry>


                        {/* {response?.Bing?.value?.map((data) => (<a href={data?.contentUrl} target="_blank">
            <LazyLoadImage
            src={data?.thumbnailUrl}
            style={{ width: "100%", display: "block"  }} className="p-1"
            />
            </a>
            ))} */}

                        {response?.unsplash?.results?.map((data, key) => (<a href={data?.urls?.full} target="_blank">
                            <LazyLoadImage
                                src={data?.urls?.small}
                                style={{ width: "100%", display: "block" }} className="p-1"
                            />
                        </a>))}

                        {response?.pixarbay?.hits?.map((data, key) => (<a href={data?.largeImageURL} target="_blank">
                            <LazyLoadImage src={data?.previewURL} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
                        </a>))}

                        {response?.wallhaven?.data?.map((data, key) => (<a href={data?.path} target="_blank">
                            <LazyLoadImage src={data?.thumbs?.small} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
                        </a>))}

                        {response?.websearch?.value?.map((data) => (
                            <a href={data?.url} target="_blank">
                                <LazyLoadImage src={data?.thumbnail} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
                            </a>
                        ))}

                        {response?.pixel?.photos?.map((data) => (<a href={data?.src?.large} target="_blank">
                            <LazyLoadImage
                                src={data?.src?.small}
                                style={{ width: "100%", display: "block" }} className="p-1"
                            />
                        </a>
                        ))}

                        {/* {response?.pixel?.photos?.map((data) => ( <a href={data?.src?.large} target="_blank">

              <img src={data?.src?.small} style={{ width: "100%", display: "block"  }} className="p-1" alt="" />

            </a>
          ))}
            {response?.unsplash?.results?.map((data, key) => (<a href={data?.urls?.full} target="_blank">
              <img src={data?.urls?.small} style={{ width: "100%", display: "block" }} alt="" className="p-1" />
            </a>))}
            {response?.pixarbay?.hits?.map((data, key) => (<a href={data?.largeImageURL} target="_blank">
              <img src={data?.previewURL} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
            </a>))}

            {response?.wallhaven?.data?.map((data, key) => (<a href={data?.path} target="_blank">
              <img src={data?.thumbs?.small} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
            </a>))}
            {response?.websearch?.value?.map((data) => (
              <a href={data?.url} target="_blank">
                <img src={data?.thumbnail} style={{ width: "100%", display: "block" }} className="p-1" alt="" />
              </a>
            ))} */}

                    </Mansonry>

                </ResponsiveMasonry>
            </div>

            {/* <div>
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      />
      </div> */}


        </>
    )
}

export default Images
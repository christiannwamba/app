import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CommentsWidget from '../components/CommentsWidget';

class IndexPage extends Component {

	state = { post: null }

	componentDidMount() {
		axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
			.then(response => this.setState({ post: response.data }));
	}

  render() {
    return (
      <Layout pageTitle="Realtime Comments">
        <main className="container-fluid position-absolute h-100 bg-white">
          <div className="row position-absolute w-100 h-100">

            <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center border-right border-gray px-0">

							{ this.state.post && <div className="position-relative h-100">

								<div className="px-5 mt-5 pt-5 mx-5">
									<span className="d-block px-5 mx-5 pt-5 h5 text-uppercase text-primary font-weight-bold mb-3">Editor's Pick</span>
									<span className="d-block px-5 mx-5 pb-5 h1 text-dark border-bottom border-gray">Getting Started with Lorem Ipsum</span>
								</div>
								
								<div className="d-block h-50 px-5 mt-5 pt-3 mx-5 position-relative" style={{ overflowY: 'auto' }}>
                	<span className="d-block px-5 mx-5 text-secondary text-justify" style={{ fontSize: '1rem', whiteSpace: 'pre-line' }}>{ this.state.post }</span>
								</div>

              </div> }

            </section>

            <section className="col-md-4 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-light px-0">
							{ this.state.post && <CommentsWidget /> }
						</section>

          </div>
        </main>
      </Layout>
    );
  }

};

export default () => (
  <IndexPage />
);

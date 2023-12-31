/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import StoryDbSource from '../../data/storydb-source';
import { createReviewTableBody } from '../templates/template-creator';

const DataReview = {
  async render() {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wave = document.querySelector('#wave');
    header.classList.add('d-none');
    footer.classList.add('d-none');
    wave.classList.add('d-none');
    return `
            <div class="sidebar">
                <img src="./logoatas.png" alt="Admin Photo">
                <h2>Hi, admin!</h2>
                <a href="#/dashboard-admin">Dashboard</a>
                <a href="#/data-review">Data Review</a>
                <a href="#/beranda">Keluar</a>
            </div>
            <div class="dashboard-content">
                <h1>Data Review</h1>
                <table class="review-table">
                    <thead>
                        <tr>
                            <th>ID Review</th>
                            <th>ID Story</th>
                            <th>Nama</th>
                            <th>Tanggal</th>
                            <th>Isi Review</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                    </tbody>
                </table>
                <h3 id="no-data-notif">Tidak ada data</h3>
            </div>
        `;
  },

  async afterRender() {
    const tableBody = document.querySelector('#table-body');
    const reviews = await StoryDbSource.getAllReview();
    if (reviews.length > 0) {
      const emptyNotif = document.querySelector('#no-data-notif');
      emptyNotif.style.display = 'none';
    }
    reviews.forEach((review) => {
      tableBody.innerHTML += createReviewTableBody(review);
    });

    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        Swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda yakin ingin menghapus?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const { reviewId } = button.dataset;
            await StoryDbSource.deleteReviewById(reviewId);
            window.location.reload();
          }
        });
      });
    });
  },
};

export default DataReview;

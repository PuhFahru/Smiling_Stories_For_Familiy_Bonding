/* eslint-disable no-alert */
import StoryDbSource from '../../data/storydb-source';
import { createDashboardCard } from '../templates/template-creator';

const DashboardAdmin = {
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
          <h1>Dashboard</h1>
          <div class="container-dashboard">
          </div>
        </div>
  `;
  },

  async afterRender() {
    const cardContainer = document.querySelector('.container-dashboard');
    const dataCount = await StoryDbSource.getCount();

    dataCount.forEach((item) => {
      cardContainer.innerHTML += createDashboardCard(item);
    });
  },
};

export default DashboardAdmin;

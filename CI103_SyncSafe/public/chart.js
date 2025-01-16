new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cumulative Users Connected',
      data: cumulativeCounts,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false, // Fill the container
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Users'
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        },
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  }
});
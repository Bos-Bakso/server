/* istanbul ignore file */
const Transaction = require('./model/transaction')
const { decodeToken } = require('./helper/jwt')

const seed = async function () {
    const token = {
        '0' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZWVjMWEyMmMyZjY0MmM0NThlZTQiLCJ1c2VybmFtZSI6IlJ1YmhpVGlydGEiLCJpc093bmVyIjpmYWxzZSwibGF0aXR1ZGUiOi02LjI2MDc2MiwibG9uZ2l0dWRlIjoxMDYuNzgxNDYxLCJoaXN0b3J5IjpbXSwiaW1hZ2UiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vYm9zYmFrc28vMTU3NDE3MDMwNDk1NHJ1YmhpLnBuZyIsInJvbGUiOiJiYXNvIiwiZmFjZWJvb2siOiJzYXR1Ym9zYmFrc28uc2F0dWJvc2Jha3NvIiwiaWF0IjoxNTc0MTcxMDY4fQ.pfGUb76S4zLJL_q1rFllZJf7q-re6WgMrBcPVqBDb4I',
        '1' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZWYzZmEyMmMyZjY0MmM0NThlZTUiLCJ1c2VybmFtZSI6IlJpemt5SWNoIiwiaXNPd25lciI6ZmFsc2UsImxhdGl0dWRlIjotNi4yNjA3NjIsImxvbmdpdHVkZSI6MTA2Ljc4MTQ2MSwiaGlzdG9yeSI6W10sImltYWdlIjoiaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2Jvc2Jha3NvLzE1NzQxNzA0MzEyNDhjaXJjbGUtY3JvcHBlZCg0KS5wbmciLCJyb2xlIjoiYmFzbyIsImZhY2Vib29rIjoic2F0dWJvc2Jha3NvLnNhdHVib3NiYWtzbyIsImlhdCI6MTU3NDE3MTA5OX0.fwHRFenvTXS6YWvsDlg7r9xh5Ki0UUrseehn_w79n9g',
        '2' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZWY5M2EyMmMyZjY0MmM0NThlZTYiLCJ1c2VybmFtZSI6IkF5dVN1ZGkiLCJpc093bmVyIjpmYWxzZSwibGF0aXR1ZGUiOi02LjI2MDc2MiwibG9uZ2l0dWRlIjoxMDYuNzgxNDYxLCJoaXN0b3J5IjpbXSwiaW1hZ2UiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vYm9zYmFrc28vMTU3NDE3MDUxNTQ1NGNpcmNsZS1jcm9wcGVkKDMpLnBuZyIsInJvbGUiOiJiYXNvIiwiZmFjZWJvb2siOiJzYXR1Ym9zYmFrc28uc2F0dWJvc2Jha3NvIiwiaWF0IjoxNTc0MTcxMTE3fQ.zgP4WyY9qSt6IY7dhKZOd9MgB-ooxGGu1SuED-8xLVc',
        '3' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZjA1YmEyMmMyZjY0MmM0NThlZTciLCJ1c2VybmFtZSI6IkFsZGlOb2YiLCJpc093bmVyIjpmYWxzZSwibGF0aXR1ZGUiOi02LjI2MDc2MiwibG9uZ2l0dWRlIjoxMDYuNzgxNDYxLCJoaXN0b3J5IjpbXSwiaW1hZ2UiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vYm9zYmFrc28vMTU3NDE3MDcxNTU1NGNpcmNsZS1jcm9wcGVkKDIpLnBuZyIsInJvbGUiOiJiYXNvIiwiZmFjZWJvb2siOiJzYXR1Ym9zYmFrc28uc2F0dWJvc2Jha3NvIiwiaWF0IjoxNTc0MTcxMTM0fQ.bqsXuRxQc31aqvQHOiawPKtvycKwiK-xQO4eI7jdBoA',
        '4' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZjBjY2EyMmMyZjY0MmM0NThlZTgiLCJ1c2VybmFtZSI6Ikdob3ppTSIsImlzT3duZXIiOmZhbHNlLCJsYXRpdHVkZSI6LTYuMjYwNzYyLCJsb25naXR1ZGUiOjEwNi43ODE0NjEsImhpc3RvcnkiOltdLCJpbWFnZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9ib3NiYWtzby8xNTc0MTcwODI3ODQwY2lyY2xlLWNyb3BwZWQoMSkucG5nIiwicm9sZSI6ImJhc28iLCJmYWNlYm9vayI6InNhdHVib3NiYWtzby5zYXR1Ym9zYmFrc28iLCJpYXQiOjE1NzQxNzExNDl9.rESz21AHgreqHnZ-GBbwhrACNAIt9CN9Yhlvj2z0JSo',
        '5' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQzZjE1OGEyMmMyZjY0MmM0NThlZTkiLCJ1c2VybmFtZSI6Ik51Y2t5R3VhbmF3YW4iLCJpc093bmVyIjpmYWxzZSwibGF0aXR1ZGUiOi02LjI2MDc2MiwibG9uZ2l0dWRlIjoxMDYuNzgxNDYxLCJoaXN0b3J5IjpbXSwiaW1hZ2UiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vYm9zYmFrc28vMTU3NDE3MDk2NzgzMGNpcmNsZS1jcm9wcGVkLnBuZyIsInJvbGUiOiJiYXNvIiwiZmFjZWJvb2siOiJzYXR1Ym9zYmFrc28uc2F0dWJvc2Jha3NvIiwiaWF0IjoxNTc0MTcxMTg4fQ.Mq8drRyDPUzgrPjBnv3i-tsKG_vR_bxFGZpZpvtLaww',
    }
    const minLat = -6.243782
    const maxLat = -6.292254
    const minLong = 106.758415
    const maxLong = 106.810391
    const rangeLat = Math.abs(maxLat - minLat)
    const rangeLong = Math.abs(maxLong - minLong)

    
    for (let i = 0; i < 1000; i++) {
        console.log('seeding transaction : ', i)
        const randomMonth = Math.ceil(Math.random() * 12)
        const date = new Date(`2019-${randomMonth}-1`)
        
        const randomToken = Math.floor(Math.random()*6)
        const user = decodeToken(token[randomToken])

        const randomLat = Math.round(Math.random() * 100000 * rangeLat) / 100000 - minLat
        const randomLong = Math.round(Math.random() * 100000 * rangeLong) / 100000 + minLong

        await Transaction.create({
            tukangBaksoId: user._id,
            latitude: randomLat,
            longitude: randomLong,
            date
        })
        console.log('seeding transaction', i, 'success yeay!')
    }
}


module.exports = {
    seed
}
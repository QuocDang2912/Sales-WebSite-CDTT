import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CustomerService from '../../../services/CustomerService'

export default function ActivaUser() {
    const { user_id } = useParams()
    console.log("🚀 ~ ActivaUser ~ user_id:", user_id)
    useEffect(() => {

        (async () => {
            const result = await CustomerService.status(user_id);
            console.log("🚀 ~ result:", result)
        })();

    }, [user_id])

    return (
        <div>
            <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation" style={{ maxWidth: '37.5em' }}>
                <tbody>
                    <tr style={{ width: '100%' }}>
                        <td>
                            <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation" style={{ border: '1px solid rgb(0,0,0, 0.1)', borderRadius: 3, overflow: 'hidden' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src="https://png.pngtree.com/thumb_back/fw800/background/20230527/pngtree-puppy-cuteness-wallpapers-image_2669701.jpg" style={{ display: 'block', outline: 'none', border: 'none', textDecoration: 'none', maxWidth: '100%' }} width={620} /><table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation">
                                                <tbody style={{ width: '100%' }}>
                                                    <tr style={{ width: '100%' }} />
                                                </tbody>
                                            </table>
                                            <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation" style={{ padding: 20, paddingBottom: 0 }}>
                                                <tbody style={{ width: '100%' }}>
                                                    <tr style={{ width: '100%' }}>
                                                        <td data-id="__react-email-column">
                                                            <h2 style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
                                                                Kích hoạt tài khoản thành công
                                                            </h2>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} role="presentation" style={{ padding: '45px 0 0 0' }}>
                                <tbody>
                                    <tr>
                                        <td><img src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/yelp-footer.png" style={{ display: 'block', outline: 'none', border: 'none', textDecoration: 'none', maxWidth: '100%' }} width={620} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

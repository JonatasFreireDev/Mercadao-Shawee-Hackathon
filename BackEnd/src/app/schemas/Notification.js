import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
   {
      content: {
         type: String,
         required: true,
      },
      user_id: {
         type: Number,
         required: true,
      },
      type_user: {
         type: String,
         required: true,
      },
      read: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model('Notification', NotificationSchema);

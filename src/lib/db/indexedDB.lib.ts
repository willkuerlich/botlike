// import setGlobalVars from 'indexeddbshim/src/node-UnicodeIdentifiers';
// const foo = setGlobalVars.default as any;

// this.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
// See signature below
// setGlobalVars(); // See signature below
// foo(); // See signature below

////

// global.window = global as any; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global

// function openDatabase(name: string, version: number) {
//   return new Promise((resolve, reject) => {
//     const conn = indexedDB.open(name, version);
//     conn.onsuccess = (e: any) => resolve({ db: e.target.result });
//     conn.onerror = (e: any) => reject(e.target.result);
//   });
// }

// function getContactTransaction({ db }: any) {
//   const store = db.transaction(['contact']).objectStore('contact');
//   return new Promise((resolve, reject) => {
//     const request = store.get('491638736419@s.whatsapp.net');
//     request.onsuccess = (e: any) => resolve({ db, contact: e.target.result });
//     request.onerror = (e: any) => reject(e.target.result);
//   });
// }

// function updateContactTransaction({ db, contact }: any) {
//   const store = db.transaction(['contact'], 'readwrite').objectStore('contact');
//   return new Promise((resolve, reject) => {
//     const updatedContact = {
//       id: contact.id,
//       isAddressBookContact: 1,
//       isContactSyncCompleted: 1,
//       pushname: 'Name',
//       name: 'Name',
//       shortName: 'Name',
//       type: 'in',
//     };
//     const request = store.put(updatedContact);
//     request.onsuccess = (e: any) => resolve(e.target.result);
//     request.onerror = (e: any) => reject(e.target.result);
//   });
// }

async function init() {
  console.info('IndexDB shim is experimental and currently disabled');

  // eslint-disable-next-line */
  // this.window = global;
  // setGlobalVars();
  // const db = await openDatabase('model-storage', 810);
  // console.log('db: ', db);
}

const db = init();

export default db;

// void openDatabase('model-storage', 810)
//   .then(getContactTransaction)
//   .then(updateContactTransaction)
//   .then((updatedKey) => console.log(updatedKey))
//   .catch((err) => console.error(err));
